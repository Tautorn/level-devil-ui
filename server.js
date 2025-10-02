const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos (HTML, CSS, JS, imagens, etc.)
app.use(express.static('.'));

// Rota principal - lista todos os arquivos HTML disponíveis
app.get('/', (req, res) => {
    const fs = require('fs');
    const files = fs.readdirSync('.')
        .filter(file => file.endsWith('.html'))
        .map(file => ({
            name: file,
            url: `/${file}`,
            displayName: file.replace('.html', '').replace('-', ' ').toUpperCase()
        }));

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Level Devil - Páginas Satíricas</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Courier New', monospace;
                background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
                color: #00ff00;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 40px;
            }
            
            h1 {
                font-size: 3em;
                text-shadow: 0 0 20px #00ff00;
                animation: glow 2s ease-in-out infinite alternate;
                margin-bottom: 10px;
            }
            
            @keyframes glow {
                from { text-shadow: 0 0 10px #00ff00; }
                to { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
            }
            
            .devil-icon {
                font-size: 4em;
                margin-bottom: 20px;
                animation: bounce 1s infinite;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            .subtitle {
                font-size: 1.2em;
                color: #ffff00;
                margin-bottom: 20px;
            }
            
            .pages-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                max-width: 800px;
                width: 100%;
            }
            
            .page-card {
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #00ff00;
                padding: 20px;
                text-align: center;
                transition: all 0.3s ease;
                cursor: pointer;
                text-decoration: none;
                color: #00ff00;
            }
            
            .page-card:hover {
                background: rgba(0, 255, 0, 0.1);
                box-shadow: 0 0 20px #00ff00;
                transform: scale(1.05);
            }
            
            .page-title {
                font-size: 1.5em;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            .page-description {
                font-size: 0.9em;
                color: #cccccc;
                line-height: 1.4;
            }
            
            .warning {
                margin-top: 30px;
                padding: 15px;
                border: 1px solid #ff0000;
                background: rgba(255, 0, 0, 0.1);
                color: #ff0000;
                max-width: 600px;
                text-align: center;
            }
            
            .server-info {
                margin-top: 20px;
                padding: 10px;
                background: rgba(0, 255, 0, 0.1);
                border: 1px solid #00ff00;
                color: #00ff00;
                font-size: 0.9em;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="devil-icon">😈</div>
            <h1>Level Devil</h1>
            <div class="subtitle">Páginas Satíricas Absurdas</div>
        </div>
        
        <div class="pages-grid">
            ${files.map(file => `
                <a href="${file.url}" class="page-card">
                    <div class="page-title">${file.displayName}</div>
                    <div class="page-description">
                        ${getPageDescription(file.name)}
                    </div>
                </a>
            `).join('')}
        </div>
        
        <div class="warning">
            ⚠️ ATENÇÃO: Estas páginas contêm funcionalidades intencionalmente frustrantes e satíricas. 
            Use por sua própria conta e risco! 😈
        </div>
        
        <div class="server-info">
            🚀 Servidor rodando na porta ${PORT}<br>
            📁 Servindo arquivos estáticos do diretório atual
        </div>
    </body>
    </html>
    `;
    
    res.send(html);
});

// Função para gerar descrições das páginas
function getPageDescription(filename) {
    const descriptions = {
        'zoom-interface.html': 'Interface de zoom com lógica completamente invertida. Zoom in diminui, zoom out aumenta!',
        'game-rules.md': 'Regras e conceitos do projeto Level Devil'
    };
    
    return descriptions[filename] || 'Página satírica com funcionalidades absurdas e frustrantes.';
}

// Rota para servir arquivos HTML diretamente
app.get('*.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('😈 Level Devil Server iniciado!');
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log('📁 Servindo arquivos estáticos do diretório atual');
    console.log('💀 Páginas satíricas prontas para frustrar usuários!');
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).send(`
        <html>
            <body style="font-family: monospace; background: #1a1a1a; color: #ff0000; padding: 20px;">
                <h1>😈 Level Devil - Erro!</h1>
                <p>Algo deu errado no servidor satírico!</p>
                <p>Erro: ${err.message}</p>
                <a href="/" style="color: #00ff00;">Voltar ao início</a>
            </body>
        </html>
    `);
});
