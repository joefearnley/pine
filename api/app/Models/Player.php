<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Team;

class Player extends Model
{
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_playing' => 'boolean',
            'is_goalie' => 'boolean',
        ];
    }

    /**
     * Get the team the player plays on.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
