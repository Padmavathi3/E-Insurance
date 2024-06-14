import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/services/policy-service/policy.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  paymentId: number | undefined;
  paymentDetails: any = {}; // Object to hold payment details
  downloadBtn: boolean = false;
  @ViewChild('template', { static: true }) template!: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService
  ) { }

  ngOnInit(): void {
    // Get paymentId from query params
    this.activatedRoute.queryParams.subscribe(params => {
      this.paymentId = +params['paymentId'];
      console.log('Payment ID:', this.paymentId); // Check if paymentId is correctly retrieved
      
      if (this.paymentId) {
        this.getPaymentDetails(this.paymentId);
      }
    });
  }

  getPaymentDetails(paymentId: number): void {
    this.policyService.receiptCall(paymentId).subscribe(
      (response: any) => {
        console.log('Payment Receipt:', response);
        if (response && response.data && response.data.length > 0) {
          this.paymentDetails = response.data[0]; // Assuming API response structure
          // Format the payment date
          this.paymentDetails.paymentDate = this.formatDate(this.paymentDetails.paymentDate);
        }
      },
      (error) => {
        console.error('Error fetching payment details:', error);
        // Handle error scenario if needed
      }
    );
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  downloadAsPdf() {
    this.downloadBtn = true; // Disable download button to prevent multiple clicks

    const pdf = new jsPDF();
    const content: HTMLElement = this.template.nativeElement;

    html2canvas(content).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      pdf.addImage(imageData, 'PNG', 0, 0, 211, 298);
      pdf.save('Insurance_Receipt.pdf');
      this.downloadBtn = false; // Show the download button again
    }).catch((error) => {
      console.error('Error generating PDF', error);
      this.downloadBtn = false; // Ensure the download button is shown again in case of error
    });
  }

}
