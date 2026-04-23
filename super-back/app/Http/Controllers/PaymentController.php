<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;
use App\Models\SuperAdmin;
use App\Models\Center;
use App\Notifications\SystemNotification;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->middleware(function ($request, $next) {
            if (!auth('super_admin')->check()) {
                return response()->json([
                    'message' => 'Unauthorized. Super Admin access only.',
                ], 403);
            }

            return $next($request);
        });

        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $payments = $this->paymentService->getAllPayments();
        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'center_id' => 'required|integer|exists:centers,id',
            'amount' => 'required|numeric|min:0',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000|max:2100',
            'payment_method' => 'required|string|max:255',
            'note' => 'nullable|string',
        ]);

        try {
            $payment = $this->paymentService->createPayment($validated);

            $center = Center::find($validated['center_id']);

            $admins = SuperAdmin::all();
            foreach ($admins as $admin) {
                $admin->notify(new SystemNotification(
                    "New payment from {$center->name} ({$payment->amount} MAD)",
                    "payment"
                ));
            }

            return response()->json([
                'message' => 'Payment added successfully',
                'data' => $payment,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    public function centerPayments($centerId)
    {
        $payments = $this->paymentService->getPaymentsByCenter((int) $centerId);
        return response()->json($payments);
    }
}