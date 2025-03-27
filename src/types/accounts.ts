// Define the enum for exchange names
export enum ExchangeName {
    GATEIO = 'gateio',
    BINANCE = 'binance',
    BYBIT = 'bybit',
  }
  
  // Define account status
  export enum AccountStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
  
  export interface Account {
    id: string
    exchange: ExchangeName
    apiKey: string
    secretKey: string
    status: AccountStatus
  }
  
  // Helper function to get display name for exchanges
  export const getExchangeDisplayName = (name: string): string => {
    switch (name) {
      case ExchangeName.GATEIO:
        return 'Gate.io'
      case ExchangeName.BINANCE:
        return 'Binance'
      case ExchangeName.BYBIT:
        return 'Bybit'
      default:
        return 'Unknown Exchange'
    }
  }
  