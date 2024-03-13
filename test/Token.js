const {expect} = require(`chai`);
const {ether} = require(`hardhat`);
const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), `ether`)

}
describe(`Token`, () => {
	let token 
	let accounts
	let deployer

	beforeEach(async() =>  {  //1. change
		//1.Excuted befoe each example(ie.it)
		const Token = await ethers.getContractFactory(`Token`)
		token = await Token.deploy('My First Token', `HOODc`, 1000000)

		//Fetch accounts into account
		accounts = await ethers.getSigners()
		deployer = accounts[0]
		//deployer = account[0]
		
	})

describe(`Deployment`, () => {
	const name = 'My First Token'
	const symbol = `HOODc`
	const decimals = `18`
	const totalSupply = tokens(`1000000`)

	it(`has correct name`, async () => {
		//check that name is correct
		
		//Fetch Token from Blockchain
		//1.const Token = await ethers.getContractFactory(`Token`)
		//1. let token = await Token.deploy()
		
		//Read Token name
		//2.const name = await token.name()
		//console.log(`too ${token.name}`)
		
		//2.expect(name).to.equal("My First Token")
		expect(await token.name()).to.equal(name)    //2.change
		})

	//======================================
	it(`has correct Symbol`, async () => {
		//check that Symbol is correct
		
		//Fetch Token from Blockchain
		//1.const Token = await ethers.getContractFactory(`Token`)
		//1.let token = await Token.deploy()
		
		//Read Symbol
		//2. const symbol = await token.symbol()
		//console.log(`too ${token.name}`)
		
		expect(await token.symbol()).to.equal(symbol)
		})
	//======================================


	it(`has correct decimal`, async () => {
		//check that Symbol is correct
		
		//Fetch Token from Blockchain
		//1.const Token = await ethers.getContractFactory(`Token`)
		//1.let token = await Token.deploy()
		
		//Read Symbol
		//2. const symbol = await token.symbol()
		//console.log(`too ${token.name}`)
		
		expect(await token.decimals()).to.equal(decimals)

		})
	//======================================

	it(`has correct totalSupply`, async () => {
		//check that Symbol is correct
		
		//Fetch Token from Blockchain
		//1.const Token = await ethers.getContractFactory(`Token`)
		//1.let token = await Token.deploy()
		
		//Read Symbol
		//2. const symbol = await token.symbol()
		//console.log(`too ${token.name}`)
		//3. const value = tokens(`1000000`)
		//3. const value = ethers.utils.parseUnits(`1000000`, ether) 
		expect(await token.totalSupply()).to.equal(totalSupply)
		//expect(await token.totalSupply()).to.equal(value) //3
		})

	it(`assigns total supply to deployer`, async () => {
	console.log(deployer.address)
	expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)
		})
	})
})