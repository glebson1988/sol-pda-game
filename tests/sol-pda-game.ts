import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { SolPdaGame } from "../target/types/sol_pda_game";
import { expect } from "chai";

describe("sol-pda-game", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolPdaGame as Program<SolPdaGame>;

  it("Sets and changes name", async () => {
    const [userStatsPDA] = await PublicKey.findProgramAddress(
      [Buffer.from("user-stats"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .createUserStats("john")
      .accounts({
        user: provider.wallet.publicKey,
        userStats: userStatsPDA,
      })
      .rpc();

    expect(
      (await program.account.userStats.fetch(userStatsPDA)).name
    ).to.equal("john");

    await program.methods
      .changeUserName("jane")
      .accounts({
        user: provider.wallet.publicKey,
        userStats: userStatsPDA,
      })
      .rpc();

    expect(
      (await program.account.userStats.fetch(userStatsPDA)).name
    ).to.equal("jane");
  });
});
