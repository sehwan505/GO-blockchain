package main

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"time"
	"strconv"
)


type Block struct {
	Timestamp int64
	Data []byte
	PrevBlockHash []byte
	Hash []byte
}


func (b *Block) setHash(){
	timestamp := []byte(strconv.FormatInt(b.Timestamp, 10))
	headers := bytes.Join([][]byte{b.PrevBlockHash, b.Data, timestamp}, []byte{})
	hash := sha256.Sum256(headers)
	b.Hash = hash[:]
}

func NewBlock(data string, prevBlockHash []byte) *Block {
	block := &Block{time.Now().Unix(), []byte(data), prevBlockHash, []byte{}}
	block.setHash()
	return block
}

type BlockChain struct{
	blocks []*Block
}

func (bc *BlockChain) AddBlock(data string) {
        prevBlock := bc.blocks[len(bc.blocks)-1]
        newBlock := NewBlock(data, prevBlock.Hash)
        bc.blocks = append(bc.blocks, newBlock)
}

func NewGenesisBlock() *Block {
        return NewBlock("Genesis Block", []byte{})
}

func NewBlockChain() *BlockChain{
	return &BlockChain{[]*Block{NewGenesisBlock()}}
}

func main() {
        bc := NewBlockChain()

        bc.AddBlock("Send 1 BTC to Ivan")
        bc.AddBlock("Send 2 more BTC to Ivan")

        for _, block := range bc.blocks {
                fmt.Printf("Prev. hash: %x\n", block.PrevBlockHash)
                fmt.Printf("Data: %s\n", block.Data)
                fmt.Printf("Hash: %x\n", block.Hash)
                fmt.Println()
        }
}