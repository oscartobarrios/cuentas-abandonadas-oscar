import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioModelo } from 'src/app/domain/models/administrativo/funcionario';

@Component({
  selector: 'app-funcionario-registro',
  templateUrl: './funcionario-registro.component.html',
  styleUrls: ['./funcionario-registro.component.css']
})
export class FuncionarioRegistroComponent implements OnInit {

  funcionarioForm: FormGroup;
  funcionario: FuncionarioModelo;
  constructor(private _modalService: NgbModal,private fb: FormBuilder) { 
    this.formInit();
  }

  ngOnInit(): void {
  }

  formInit(){

    this.funcionarioForm = this.fb.group({
      Usuario: ['', Validators.required],
      Cargo: ['', Validators.required],
      foto: ['', Validators.required],      
    });

  }

  onSubmit(){
    if(this.funcionarioForm.valid)
    {

    }
    else{

    }
  }

}
