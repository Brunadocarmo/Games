import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();

app.use(express.json());
app.use(express.static('public'));

function criarCliente() {
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'root',
        database: 'teste_db'
    });
}

app.get('/api/tarefas', async (req, res) => {
    const cliente = criarCliente();

    try {
        await cliente.connect();

        const resultado = await cliente.query(
            'SELECT * FROM tarefas'
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao buscar tarefas'
        });

    } finally {
        await cliente.end();
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
