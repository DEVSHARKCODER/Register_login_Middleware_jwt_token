document.getElementById('regisForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = document.getElementById('regisForm');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cfpassword = document.getElementById('confirm-password').value;
    const createUsers = '/api/create-users';
    
    if (!username || !email || !password || !cfpassword) {
        Swal.fire({
            title: 'ข้อมูลไม่ครบ!',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            icon: 'warning',
            confirmButtonText: 'ยืนยัน'
        });
    } 
    
    else if (password !== cfpassword) {
        Swal.fire({
            title: 'รหัสผ่านไม่ตรงกัน!',
            text: 'กรุณากรอกรหัสผ่านให้ตรงกัน',
            icon: 'error',
            confirmButtonText: 'ยืนยัน'
        });
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
    } 
    
    else {
        const formData = {
            username: username,
            email: email,
            password: password
        };

        
        axios.post(createUsers, formData)
            .then(response => {
                const data = response.data;
                
                if (data.success) {
                    Swal.fire({
                        title: 'สำเร็จ!',
                        text: 'การสมัครสมาชิกสำเร็จ',
                        icon: 'success',
                        confirmButtonText: 'ยืนยัน'
                    });
                    form.reset(); 
                } 
            })
            .catch(error => {
                
                if (error.response && error.response.status === 409 && error.response.data.message === 'Username or email already exists') {
                    Swal.fire({
                        title: 'ข้อผิดพลาด!',
                        text: 'มี Username หรือ Email นี้แล้ว',
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    });
                } else {
                    
                    Swal.fire({
                        title: 'ข้อผิดพลาด!',
                        text: 'โปรดลองใหม่อีกครั้งภายหลัง',
                        icon: 'error',
                        confirmButtonText: 'ยืนยัน'
                    });
                }
                console.error('ข้อผิดพลาด:', error);
            });
    }
});
