package proof

import "math"

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
