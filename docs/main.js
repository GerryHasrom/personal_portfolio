import init, { process_command } from './wasm/shell.js';

async function start() {
    await init();

    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');

    inputField.focus();
    terminal.addEventListener('click', () => inputField.focus());

    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = inputField.value.trim();
            if (command === '') return;

            addLine(outputDiv, `<span class="prompt">user@portfolio:~$</span> ${command}`, 'input-line');
            addLine(outputDiv, '', 'spacer');

            const result = process_command(command);

            if (result.startsWith('REDIRECT:')) {
                const url = result.split(':')[1];
                window.location.href = url;
                return; 
            }

            if (result === 'CLEAR_TERMINAL') {
                outputDiv.innerHTML = '';
            } else {
                addLine(outputDiv, result, 'output-line');
            }

            inputField.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    const welcomeArt = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
`;

    const welcomeHelp = "Type 'help' to get started or 'go' to view my portfolio directly.";

    addLine(outputDiv, welcomeArt, 'welcome-art');
    addLine(outputDiv, welcomeHelp, 'welcome-help');
}

function addLine(container, text, className) {
    const div = document.createElement('div');
    div.className = className || '';
    div.innerHTML = text;
    container.appendChild(div);
}

start().catch(console.error);