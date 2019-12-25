const TelegramBot = require('node-telegram-bot-api');

const config = require('config-json');
config.load('./config.json');

let tgToken = config.get('token');
const bot = new TelegramBot(tgToken, {polling: true});


bot.onText(/\/start/, (msg,match) => {
 const chatId = msg.chat.id;
 const userId = msg.from.id;
 bot.sendMessage(chatId, `Привет. Меня зовут Иван, я сделал этого бота в качестве резюме, чтобы попасть на стажировку:) Добро пожаловать`, {
	reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Обо мне', callback_data: '1' }],
      [{ text: 'Небольшая презентация знаний', callback_data: '2' }],
      [{ text: 'Ссылка на учебные проекты', callback_data: '3' }],
      [{ text: 'Контакты', callback_data: '4' }],
    ]
  })
})
});

bot.on('callback_query', function (message) {
    const clientId = message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
  
    if(message.data === '1'){
        bot.sendMessage(clientId, 'Меня зовут Иван, мне 30 лет. Не так давно я решил поменять сферу деятельности и начать учить программирование. Программирование кроме неограниченных возможностей для самореализации также дает возможность делать нашу жизнь лучше. Иногда намного лучше. В настоящее время я обучаюсь в Яндекс Практикуме на курсе Вэб разработка. Кроме этого самостоятельно прохожу курс Вэб Разработки на codecademy.com . Мне очень хочется начать свой путь в ИТ как можно скорее:)');
    } else if (message.data === '2') { 
    	bot.sendMessage (clientId, `Ниже я постарался продемонстрировать, либо описать, что я знаю из требований к знаниям`, {
    reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'JS, HTML, CSS', callback_data: '2_1' }],
      [{ text: 'Data types' , callback_data: '2_2' }],
      [{ text: 'Arrays & Objects', callback_data: '2_3' }]
    ]
  })
})
    } else if (message.data === '2_1') {
    	bot.sendMessage (clientId, `Обладаю базовыми знаниями HTML и CSS, при возникновении трудностей в реализации проекта использую Google. В первом учебном проекте все элементы устанавливал div во втором уже использовал соответствующие теги. Что касается JS. Хотя учить язык начал совсем недавно, но уже усвоил что такое объекты, массивы, методы. На практике не всегда получается с певого раза применять полученные знания, пользуюсь подсказками в тренажере, google и stackowerflow.`);
    } else if (message.data === '2_2') {
    	bot.sendMessage (clientId, `Знаю типы данных на базовом уровне. Тут я бы мог их перечислить, но постараюсь просто продемонстрировать умение применить некоторые из них в деле`);
    } else if (message.data === '2_3') {
    	bot.sendMessage (clientId, `Массивы и Объекты, думаю лучше всего понимание продемонстрирует небольшое демо`, {
    		reply_markup: JSON.stringify({
    			inline_keyboard: [
    			[{ text: 'Массив', callback_data: '6_1' }],
      			[{ text: 'Объект' , callback_data: '6_2' }]
    			]
    		})
    	})

    } else if (message.data === '6_1') {
    	let array = ['Желаю хорошего дня', 'Не засиживайся до поздна', 'Не забудь поесть', 'Одевайся теплее', 'Поел? Убери за собой!', 'В Питере опять дождь'];
    	let random = Math.floor(Math.random() * array.length);
	
		
    	bot.sendMessage (clientId, `Если вы нажали кнопку "Массив" то скрипт взял случайное значение из массива и вернул его вам. Например: ` + array[random].toString());

    } else if (message.data === '6_2') {
    	let person = {
    		name: 'Ivan' ,
    		last_name: 'Khoda',
    		age: 30,
    		
    		intro() {
  			return this.name+ ' ' + this.last_name + ' ' + this.age
  			
			}
		};
			
			bot.sendMessage (clientId, `Бот вывел мое имя и возраст, записанные объектом и с помощью .this: ` + person.intro() );

    } else if (message.data === '3') {
    	bot.sendMessage(clientId, 'Мои учебные проекты можно найти на GitHub по ссылке https://github.com/ivankhoda куда я буду сохранять все проекты, в том числе этого бота:)')
    } else if (message.data === '4') {
    	bot.sendMessage(clientId, 'Если вас заинтересовало мое резюме, связывайтесь со мной любым способом: 89992219141 - мой номер телефона; ivankhoda@gmail.com почта; @IvanKhoda мой телеграм.')
    }






    }); 