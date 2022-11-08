package main

import (
	"math"
	"fmt"
	"crypto/sha256"
)
const targetBits = 24

type ProofOfWork struct {
	block *Block
	target *bit.Int
}

func NewProofofWork(b *Block) *ProofOfWork{
	target := big.NewInt(1)
	target.Lsh(target, uint(256 - targetBits))
	
	pow := &ProofOfWork{b, target}
}


func (pow *ProofOfWork) prepareData(nonce int) []byte {
        data := bytes.Join(
                [][]byte{
                        pow.block.PrevBlockchain,
                        pow.block.Data,
                        IntToHex(pow.block.Timestamp),
                        IntToHex(int64(targetBits)),
                        IntToHex(int64(nonce)),
                },
                []byte{},
        )
        return data
}

func (pow *ProofOfWork) Run() (int, []byte){
	var hashInt big.hashInt
	var hash [32]byte
	nonce := 0
	
	fmt.Printf("%s", pow.block.Data)
	
	for nonce < maxNonce {
		data := pow.prepareData(nonce)
		hash = sha256.Sum256(data)
		fmt.Printf("\r%x", hash)
		
		hashInt.setBytes(hash[:])
		if hashInt.cmp(pow.target) == -1{
			break
		}
		else{
			nonce++
		}
	}
	fmt.Printf("\n\n")
	return nonce, hash[:]
}

