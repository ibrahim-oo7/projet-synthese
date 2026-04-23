<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CenterPayment extends Model
{
    protected $fillable = [
        'center_id',
        'amount',
        'month',
        'year',
        'payment_method',
        'note',
    ];

    public function center()
    {
        return $this->belongsTo(Center::class);
    }
}