import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;
  returnUrl: string = '/dashboard';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Verificar si ya está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    // Obtener URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    // Crear formulario con validaciones
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    // Validar formulario
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    // ============================================================
    // MODO DEMO: Autenticación sin backend
    // ============================================================
    if (username === 'admin' && password === 'admin123') {
      // Simular respuesta exitosa del servidor
      const mockUser = {
        id: '1',
        username: 'admin',
        email: 'admin@rutasmart.mx',
        role: 'admin'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Guardar en localStorage (simula lo que haría el AuthService)
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      this.loading = false;
      console.log('✅ Login exitoso (modo demo)');
      
      // Redirigir al dashboard
      this.router.navigate([this.returnUrl]);
      return;
    }

    // ============================================================
    // MODO PRODUCCIÓN: Intentar login real con API
    // ============================================================
    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('✅ Login exitoso con API:', response);
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
        
        // Si las credenciales son incorrectas
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } 
        // Si el servidor no está disponible
        else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar al servidor. Usando modo demo.';
          console.warn('⚠️ Backend no disponible. Intenta: admin / admin123');
        } 
        // Otros errores
        else {
          this.errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';
        }
        
        console.error('❌ Login error:', error);
      }
    });
  }

  // Método para login demo rápido (botón de acceso rápido)
  loginDemo(): void {
    this.loginForm.patchValue({
      username: 'admin',
      password: 'admin123'
    });
    this.onSubmit();
  }

  // Toggle para mostrar/ocultar contraseña
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Helper para mostrar errores del formulario
  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    
    if (control?.hasError('required')) {
      return `${field === 'username' ? 'El usuario' : 'La contraseña'} es requerido`;
    }
    
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return '';
  }
}