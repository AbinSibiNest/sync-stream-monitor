import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MigrationRecordDetailProps {
  onConfirm?: (recordId: string) => void;
}

const MigrationRecordDetail = ({ onConfirm }: MigrationRecordDetailProps) => {
  const { recordId, firmId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for the record detail
  const recordDetail = {
    referenceId: recordId || "REF-001",
    firmId: firmId || "firm-001",
    trustAccountId: "TA-12345",
    defendants: {
      grossSettlementAmount: 50000,
    },
    client: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+1-555-0101",
      birthdate: "1985-03-15",
      address: "123 Main St, New York, NY 10001",
    },
    settlement: {
      settledAmount: 15000,
    },
    deductions: [
      { type: "Attorney Fees", amount: 5000 },
      { type: "Court Costs", amount: 1500 },
      { type: "Medical Liens", amount: 2800 },
      { type: "Case Expenses", amount: 700 },
    ],
  };

  const handleConfirm = () => {
    // Mark record as confirmed and navigate back
    onConfirm?.(recordDetail.referenceId);
    
    // Trigger custom event to update checkbox
    window.dispatchEvent(new CustomEvent('recordConfirmed', { 
      detail: { recordId: recordDetail.referenceId } 
    }));
    
    toast({
      title: "Record Confirmed",
      description: "The migration record has been confirmed and marked for processing.",
    });
    
    navigate(`/firm/${firmId}#pending-migration`);
  };

  const handleBack = () => {
    navigate(`/firm/${firmId}#pending-migration`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="border-gray-700 hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-100">Migration Record Detail</h1>
            <p className="text-gray-400">Reference ID: {recordDetail.referenceId}</p>
          </div>
        </div>
        <Button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm Migration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Reference ID</label>
              <p className="text-gray-100 font-medium">{recordDetail.referenceId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Firm ID</label>
              <p className="text-gray-100 font-medium">{recordDetail.firmId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Trust Account ID</label>
              <p className="text-gray-100 font-medium">{recordDetail.trustAccountId}</p>
            </div>
          </CardContent>
        </Card>

        {/* Defendants Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Defendants</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm text-gray-400">Gross Settlement Amount</label>
              <p className="text-2xl font-bold text-green-400">
                ${recordDetail.defendants.grossSettlementAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Client Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <p className="text-gray-100 font-medium">{recordDetail.client.fullName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-gray-100">{recordDetail.client.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <p className="text-gray-100">{recordDetail.client.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Birth Date</label>
              <p className="text-gray-100">{recordDetail.client.birthdate}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Address</label>
              <p className="text-gray-100">{recordDetail.client.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Settlement Section */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-100">Settlement</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm text-gray-400">Settled Amount</label>
              <p className="text-2xl font-bold text-blue-400">
                ${recordDetail.settlement.settledAmount.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deductions Section */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Deductions</CardTitle>
          <CardDescription className="text-gray-400">
            Breakdown of all deductions from the settlement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recordDetail.deductions.map((deduction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <span className="text-gray-300">{deduction.type}</span>
                <Badge variant="outline" className="text-red-400 border-red-400">
                  -${deduction.amount.toLocaleString()}
                </Badge>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-3 mt-4">
              <div className="flex items-center justify-between font-medium">
                <span className="text-gray-200">Total Deductions</span>
                <span className="text-red-400 text-lg">
                  -${recordDetail.deductions.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MigrationRecordDetail;