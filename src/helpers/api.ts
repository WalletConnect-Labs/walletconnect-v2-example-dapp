import axios, { AxiosInstance } from "axios";
import { AssetData, GasPrices, ParsedTx } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: "https://ethereum-api.xyz",
  timeout: 30000, // 30 secs
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function apiGetAccountAssets(address: string, chainId: string): Promise<AssetData[]> {
  const ethChainId = chainId.split("@")[1];
  const response = await api.get(`/account-assets?address=${address}&chainId=${ethChainId}`);
  const { result } = response.data;
  return result;
}

export async function apiGetAccountTransactions(
  address: string,
  chainId: string,
): Promise<ParsedTx[]> {
  const ethChainId = chainId.split("@")[1];
  const response = await api.get(`/account-transactions?address=${address}&chainId=${ethChainId}`);
  const { result } = response.data;
  return result;
}

export const apiGetAccountNonce = async (address: string, chainId: string): Promise<string> => {
  const ethChainId = chainId.split("@")[1];
  const response = await api.get(`/account-nonce?address=${address}&chainId=${ethChainId}`);
  const { result } = response.data;
  return result;
};

export const apiGetGasPrices = async (): Promise<GasPrices> => {
  const response = await api.get(`/gas-prices`);
  const { result } = response.data;
  return result;
};
