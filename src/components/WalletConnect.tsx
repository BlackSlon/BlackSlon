'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { Button } from './ui/Button'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            setAddress(accounts[0].address)
          }
        } catch (error) {
          console.error('Failed to check connection:', error)
        }
      }
    }
    checkConnection()
  }, [])

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)
    setError(null)
    setShowWalletModal(false)
    
    try {
      if (walletType === 'metamask') {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new BrowserProvider(window.ethereum)
          await provider.send('eth_requestAccounts', [])
          const signer = await provider.getSigner()
          setAddress(signer.address)
        } else {
          setError('Please install MetaMask')
        }
      } else if (walletType === 'walletconnect') {
        // WalletConnect implementation would go here
        setError('WalletConnect coming soon')
      } else if (walletType === 'coinbase') {
        // Coinbase Wallet implementation would go here  
        setError('Coinbase Wallet coming soon')
      }
    } catch (error: any) {
      setError(error.message || 'Connection failed')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setAddress(null)
    setError(null)
  }

  if (address) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-[9px] text-gray-400">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <Button
          onClick={handleDisconnect}
          variant="outline"
          size="sm"
          className="text-[8px] px-2 py-1 border-gray-700 text-gray-400 hover:border-red-600 hover:text-red-600"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setShowWalletModal(true)}
        disabled={isConnecting}
        className="w-full text-[9px] py-2 bg-gray-800 text-gray-400 hover:bg-amber-700 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </Button>

      {error && (
        <div className="text-[8px] text-red-600 text-center">
          {error}
        </div>
      )}

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-gray-800 rounded-sm p-4 w-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[12px] text-gray-300 font-bold">Select Wallet</h3>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-500 hover:text-gray-300 text-[16px]"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleConnect('metamask')}
                className="w-full flex items-center gap-3 p-3 border border-gray-800 rounded-sm hover:border-amber-700 transition-all"
              >
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">M</span>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-300">MetaMask</div>
                  <div className="text-[7px] text-gray-500">Connect to your MetaMask wallet</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('walletconnect')}
                className="w-full flex items-center gap-3 p-3 border border-gray-800 rounded-sm hover:border-blue-700 transition-all"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">W</span>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-300">WalletConnect</div>
                  <div className="text-[7px] text-gray-500">Connect to WalletConnect</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('coinbase')}
                className="w-full flex items-center gap-3 p-3 border border-gray-800 rounded-sm hover:border-blue-500 transition-all"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">C</span>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-gray-300">Coinbase Wallet</div>
                  <div className="text-[7px] text-gray-500">Connect to Coinbase Wallet</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
