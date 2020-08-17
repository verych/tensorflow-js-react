let net;
async function run() {
    console.log('Loading mobilenet...');
    net = await mobilenet.load();
    console.log('Loaded!');

    const img = document.getElementById('img');
    const result = await net.classify(img);
    console.log(result);
}

run();