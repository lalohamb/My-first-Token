const {expect} = require(`chai`);
const {ether} = require(`hardhat`);
const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), `ether`)

}
describe(`Token`, () => {
	let token 
	let accounts
	let deployer
	let receiver 
	let exchange

	beforeEach(async() =>  {  //1. change
		//1.Excuted befoe each example(ie.it)
		const Token = await ethers.getContractFactory(`Token`)
		token = await Token.deploy(`My First Token`, `HOODc`, 1000000)

		//Fetch accounts into account
		accounts = await ethers.getSigners()
		//deployer = account[0]
		deployer = accounts[0]

		receiver = accounts[1]

		exchange = accounts[2]
		
	})

describe(`Deployment`, () => {
	const name = `My First Token`
	const symbol = `HOODc`
	const decimals = `18`
	const totalSupply = tokens(`1000000`)

	it(`has correct name`, async () => {
		//check that name is correct
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
describe(`Sending Tokens`, () => {
	let amount, transaction, result
	

	describe(`Success`, () => {
		beforeEach(async () => {
			amount = tokens(100)
			transaction = await token.connect(deployer).transfer(receiver.address, amount)
			result = await transaction.wait()
		})

			it(`transfers token balance`, async () => {
				expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
				expect(await token.balanceOf(receiver.address)).to.equal(amount)


				//Logg balance transfer
				//console.log(deployer.address)
				//amount = tokens(100)
				//let tranacitons await token.connect(deployer).transfer(receiver, amount)
				//console.log("deployer balance before transfer", await token.balanceOf(deployer.address))
				//console.log("receiver balance before transfer", await token.balanceOf(receiver.address))

				//token transfer
				//amount = tokens(100)
				//let transaction = await token.connect(deployer).transfer(receiver.address, amount)
				//let result = transaction.wait()		
				
				//expect(await token.balanceOf(deployer.address)).to.equal.tokens(999900)
				//expect(await token.balanceOf(receiver.address)).to.equal.tokens(999900)
				//balance changed

				//expect(await token.transfer()).to.equal(name)    //2.change

				//balance after transer
				//console.log("deployer balance after transfer", await token.balanceOf(deployer.address))
				//console.log("receiver balance after transfer", await token.balanceOf(receiver.address))

				})
			it ('Emits a Transfer event', async () => {
				const event = result.events[0]
				//console.log(event)
				expect(event.event).to.equal(`Approval`)   //(`Approval`)Transfer
				
				const args = event.args
				expect(args.from).to.equal(deployer.address)
				expect(args.to).to.equal(receiver.address)

				expect(args.value).to.equal(amount) 
				//console.log("receiver balance after transfer", await token.balanceOf(receiver.address))
				})
			
			describe(`failure`, () => {
				it(`rejects insufficient balances`, async () => {
				const invalidAmount = tokens(10000000000)
				await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted

				//transaction = await token.connect(deployer).trasfer(receiver.address, amount)
				})

				it(`rejects invalied recepient`, async () => {
				const invalidAmount = tokens(10000000000)
				await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted

				//transaction = await token.connect(deployer).trasfer(receiver.address, amount)
				})

			})
})
	})
describe(`Appoving Tokens` , () => {
	let amount, transaction, result

	beforeEach(async () => {
		amount = tokens(100)
		transaction = await token.connect(deployer).approve(exchange.address, amount)
		result = await transaction.wait()

		})
	
	describe (`Success`, () => {
		it (`allocates an allowance for delgated token spending`, async () => {
		expect(await token.allowance(deployer.address, exchange.address)).to.equal(amount)
		})

		it ('Emits a approval event', async () => {
				const event = result.events[0]
				//onsole.log(event)
				expect(event.event).to.equal(`Approval`)
				
				const args = event.args
				expect(args.owner).to.equal(deployer.address)
				expect(args.spender).to.equal(exchange.address)

				expect(args.value).to.equal(amount) 
				//console.log("receiver balance after transfer", await token.balanceOf(receiver.address))
				})
	})

	describe (`Failure`, () => {
	it(`rejects invalidAmount senders`, async () => {
		await expect(token.connect(deployer).approve('0x0000000000000000000000000000000000000000', amount)).to.be.reverted
	})
		})

	})
})