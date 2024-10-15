document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("Login form not found!");
        return; 
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;  
        const password = document.getElementById('password').value;  
        const loginEndpoint = 'http://localhost:8080/api/user-login'; 
        
        if (!username || !password) {
            Swal.fire({
                title: 'ข้อมูลไม่ครบ!',
                text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                icon: 'warning',
                confirmButtonText: 'ยืนยัน'
            });
            return; 
        } 

        const formData = {
            username: username,
            password: password
        };

        axios.post(loginEndpoint, formData)
        .then(response => {
            const data = response.data;

            if (data.success) {
                localStorage.setItem('token', data.token); 
                Swal.fire({
                    title: 'สำเร็จ!',
                    text: 'การเข้าสู่ระบบสำเร็จ',
                    icon: 'success',
                    confirmButtonText: 'ยืนยัน'
                }).then(() => {
                    window.location.href = '/api/dashboard'; 
                });
            } else {
                Swal.fire({
                    title: 'ข้อผิดพลาด!',
                    text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
                    icon: 'error',
                    confirmButtonText: 'ยืนยัน'
                });
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            Swal.fire({
                title: 'ข้อผิดพลาด!',
                text: 'โปรดลองใหม่อีกครั้งภายหลัง',
                icon: 'error',
                confirmButtonText: 'ยืนยัน'
            });
        });
    });
});