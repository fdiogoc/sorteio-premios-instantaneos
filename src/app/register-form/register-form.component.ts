import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';



function cpfValidator(): ValidatorFn
{
  return (control: AbstractControl): { [key: string]: any } | null =>
  {
    const isValid = isValidCPF(control.value);
    return isValid ? null : { 'invalidCpf': { value: control.value } };
  };
}

function isValidCPF(value: string)
{
  if (typeof value !== 'string')
  {
    return false;
  }

  value = value.replace(/[^\d]+/g, '');

  if (value.length !== 11 || !!value.match(/(\d)\1{10}/))
  {
    return false;
  }

  const values = value.split('').map(el => +el);
  const rest = (count: number) => (values.slice(0, count - 12).reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

  return rest(10) === values[9] && rest(11) === values[10];
}
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent
{
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService)
  {
    this.form = this.formBuilder.group({
      cpf: ['', [Validators.required, cpfValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordsMatch });
  }

  private passwordsMatch(group: FormGroup)
  {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { notMatching: true };
  }



  onSubmit()
  {
    if (this.form.valid)
    {
      const formData = this.form.value;
      delete formData.confirmPassword;
      this.authService.register(formData).subscribe(
        (isRegistered) =>
        {
          if (isRegistered)
          {
            console.log('Registration successful');
          } else
          {
            console.error('Registration failed');
          }
        },
        (error) =>
        {
          console.error('Error registering:', error);
        }
      );
    }
  }
}
