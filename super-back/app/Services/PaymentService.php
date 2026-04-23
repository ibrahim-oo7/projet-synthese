<?php

namespace App\Services;

use App\Models\Center;
use App\Models\CenterPayment;
use App\Models\ActivityLog;

class PaymentService
{
    public function getAllPayments()
    {
        return CenterPayment::with('center')->latest()->get();
    }

    public function getPaymentsByCenter(int $centerId)
    {
        Center::findOrFail($centerId);

        return CenterPayment::with('center')
            ->where('center_id', $centerId)
            ->latest()
            ->get();
    }

    public function createPayment(array $data)
    {
        $center = Center::findOrFail($data['center_id']);

        $payment = CenterPayment::create([
            'center_id' => $data['center_id'],
            'amount' => $data['amount'],
            'month' => $data['month'],
            'year' => $data['year'],
            'payment_method' => $data['payment_method'],
            'note' => $data['note'] ?? null,
        ]);

        ActivityLog::create([
            'action' => 'add_payment',
            'description' => 'Payment added for center: ' . $center->name,
            'performed_by' => 'Super Admin',
        ]);

        return $payment->load('center');
    }
}