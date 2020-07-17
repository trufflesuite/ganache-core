import {ProviderOptions} from "@ganache/options";
import Account from "./things/account";

type EthereumOptions = Pick<
  ProviderOptions,
  | "defaultTransactionGasLimit"
  | "chainId"
  | "networkId"
  | "gasPrice"
  | "unlocked_accounts"
  | "allowUnlimitedContractSize"
  | "hardfork"
  | "gasLimit"
  | "db"
  | "db_path"
  | "secure"
  | "time"
  | "blockTime"
  | "callGasLimit"
> & {
  accounts: Account[];
  coinbase: Account
};

export default EthereumOptions;