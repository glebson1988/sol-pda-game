use anchor_lang::prelude::*;

declare_id!("8zqoMqZLPjdjGxsTbcKBEtJDQn9wJB1Sh4Ubiu1jHYCW");

#[program]
pub mod sol_pda_game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
