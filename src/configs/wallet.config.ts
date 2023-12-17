import { Env, env } from './env'

/**
 * Contructor
 */
type Conf = {
  walletConnectId: string
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    walletConnectId: '3d5c635fdf7dfe407aab9f35ab943bf2',
  },

  /**
   * Production configurations
   */
  production: {
    walletConnectId: '3d5c635fdf7dfe407aab9f35ab943bf2',
  },
}

/**
 * Module exports
 */
export default conf[env]
