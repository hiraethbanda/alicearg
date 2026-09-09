const commands = {
    "ondeestavoce": "Estou em 30.465633, 130.497257, <br> na direção em que o sol nasce...",
    "osolseposeondeestavoce": "Estou em 30°27'56.3'N 130°29'50.1'E, <br> na direção onde o sol nasce...",
    "futatsunokokoro": "...revivendo assuntos pra outra vida. E você? Onde está?",
    "distantedetudo": "https://youtube.com/[url]"
};
const dicas = {
    "coracoes": "1234567890",
    "doiscoracoes": "Onde estamos?"
};
const commandsTroll = {        
    "six": "seven",
    "gato": "miau",
    "bora": "bill",
    "ai": "que delicia cara",
    "pudim": "https://pudim.com.br"
};

export async function onRequestPost(context) {
    const { value } = await context.request.json();
    const input = String(value || "").toLowerCase().replace(/[^a-z]/g, ""); // sanitizar

    let result = null;
    
    if (input in commands){
        result = { type: "resposta", text: commands[input] };
    }
    else if (input in dicas){
        result = { type: "dica", text: dicas[input] };
    }
    else if (input in commandsTroll){
        result = { type: "troll", text: commandsTroll[input] };
    }

    return new Response(JSON.stringify({ result }), {
        headers: { "Content-Type": "application/json" }
    });
}