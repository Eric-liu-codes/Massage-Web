const express = require('express');
const basicAuth = require('express-basic-auth');
const data = require('./data');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static('resources/css'));
app.use('/js', express.static('resources/js'));
app.use('/images', express.static('resources/images'));

app.set('view engine', 'pug');
app.set('views', 'templates');

const authMiddleware = basicAuth({
    users: { 'admin': 'password' },
    challenge: true,
    unauthorizedResponse: (req) => (req.auth ? 'Credentials rejected' : 'No credentials provided')
});

app.get('/', (req, res) => res.render('mainpage'));
app.get('/main', (req, res) => res.render('mainpage'));
app.get('/contact', (req, res) => res.render('contactform'));
app.get('/testimonies', (req, res) => res.render('testimonies'));
app.get('/admin/contactlog', authMiddleware, async (req, res) => {
    const contacts = await data.getContacts();
    res.render('contactlog', { contacts });
});

app.post('/contact', async (req, res) => {
    try {
        const processedData = processContactData(req);
        await data.addContact(processedData);
        res.render('success');
    } catch (e) {
        res.status(400).send("Error processing contact data");
    }
});

app.get('/api/sale', async (req, res) => {
    const sales = await data.getRecentSales();
    const saleActive = sales.some(sale => sale.end_time == null);
    const saleMessage = saleActive ? sales[0].sale_text : null;
    res.json({ active: saleActive ? 1 : 0, message: saleMessage });
});

app.get('/admin/salelog', authMiddleware, async (req, res) => {
    try {
        const recentSales = await data.getRecentSales();
        const salesLog = recentSales.map(sale => ({
            message: sale.sale_text,
            active: sale.end_time == null ? 1 : 0
        }));
        res.json(salesLog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sales log" });
    }
});

app.post('/api/sale', authMiddleware, async (req, res) => {
    try {
        await data.addSale(req.body.message);
        res.json({ message: "Sale updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating sale" });
    }
});

app.delete('/api/sale', authMiddleware, async (req, res) => {
    try {
        await data.endSale();
        res.json({ message: "Sale ended" });
    } catch (error) {
        res.status(500).json({ message: "Error ending sale" });
    }
});

app.delete('/api/contact', authMiddleware, async (req, res) => {
    const id = parseInt(req.body.id);
    const success = await data.deleteContact(id);
    if (success) {
        res.json({ message: "Contact deleted" });
    } else {
        res.status(404).json({ message: "Contact not found" });
    }
});

app.use((req, res) => res.status(404).render('404'));

const PORT = 4131;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

function processContactData(req) {
    const { name, email, date, dropdown: timeOption, checkbox: payingWithCash } = req.body;
    const optionToTime = {
        option1: '9:00 AM',
        option2: '10:00 AM',
        option3: '11:00 AM',
        option4: '12:00 PM',
        option5: '1:00 PM',
        option6: '2:00 PM',
        option7: '3:00 PM',
        option8: '4:00 PM',
    };
    return {
        name, email, date,
        time: optionToTime[timeOption],
        paying_with_cash: payingWithCash === 'on'
    };
}