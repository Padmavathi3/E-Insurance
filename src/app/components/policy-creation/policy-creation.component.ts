import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyService } from 'src/app/services/policy-service/policy.service';

@Component({
  selector: 'app-policy-creation',
  templateUrl: './policy-creation.component.html',
  styleUrls: ['./policy-creation.component.scss']
})
export class PolicyCreationComponent implements OnInit {
  policyForm!: FormGroup;

  constructor(private fb: FormBuilder,private policyService:PolicyService) {
    this.policyForm = this.fb.group({
      policyName: ['', Validators.required],
      description: ['', Validators.required],
      policyType: ['', Validators.required],
      termLength: [0, Validators.required],
      coverageAmount: [0, Validators.required],
      premium: [0, Validators.required],
      entryAge: [0, Validators.required]
    });
  }
  ngOnInit(): void {
  }

  addPolicy(): void {
    if (this.policyForm.valid) {
      const formData = this.policyForm.value;
      console.log(formData);
      this.policyService.addPolicyCall(formData).subscribe((res)=>
      {
        console.log("policy added successfully",res);  
      },
    (err)=>console.log(err));

    }
  }
  

}
