const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts/:filters', () => {

    beforeEach(async () => {
        const testConcertOne = new Concert({
            _id: '5d9f1140f10a81216cfd4408',
            performer: 'John Kovalsky', 
            genre: 'K-pop', 
            day: 2, 
            price: 25, 
            image: 'image'
        });
        await testConcertOne.save();

        const testConcertTwo = new Concert({ 
            _id: '5d9f1140f10a81216cfd4448',
            performer: 'Aiden Blackwell', 
            genre: 'Neofolk', 
            day: 2, 
            price: 255, 
            image: 'image'
        });
        await testConcertTwo.save();

        const testConcertThree = new Concert({ 
            _id: '5d9f1140f10a81216cfd4409',
            performer: 'John Kovalsky', 
            genre: 'K-pop', 
            day: 1, 
            price: 250, 
            image: 'image'
        });
        await testConcertThree.save();

    });

    it('/:performer should return concert with properly performer by :performer', async () => {
        const res = await request(server).get('/api/concerts/performer/John Kovalsky');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:genre should return concert with properly genre by :genre', async () => {
        const res = await request(server).get('/api/concerts/genre/K-pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:price_min/:price_max should return concert with properly price by :price_min/:price_max', async () => {
        const res = await request(server).get('/api/concerts/price/220/260');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:day should return concert with properly day by :day', async () => {
        const res = await request(server).get('/api/concerts/day/2');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    afterEach(async () => {
        await Concert.deleteMany();
    });
    
});