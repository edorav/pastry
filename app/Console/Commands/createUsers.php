<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Str;

class createUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:dummy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = [
            [
                'name' => 'Luana',
                'email' => 'luana@gmail.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Maria',
                'email' => 'maria@outlook.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]
        ];
        try {
            foreach($users as $user) {
                $userdb = new User($user);
                $userdb->save();

                $this->info("Creato l'utente per " . $user['name']);
            }
        } catch(\Exception $e) {
            $this->info("ERRORE CREAZIONE utente " . $user['name']);
        }
        return 0;
    }
}
