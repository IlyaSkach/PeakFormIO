<?php
function log_quiz($msg) {
    file_put_contents(__DIR__ . '/telegram_quiz.log', date('Y-m-d H:i:s') . ' ' . $msg . PHP_EOL, FILE_APPEND);
}

// Укажите ваш токен и chat_id
$botToken = '7787074879:AAH9nW2pHLHxsWWKNmqhyItYdJqUH9d6WRk';
$chatIds = [ '-4781394216']; // замените на свои chat_id

// Получаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);
log_quiz('Получены данные: ' . print_r($data, true));

$text = "📝 <b>Новая заявка с квиза PeakFormIO</b>\n\n";
if (!empty($data['answers'])) {
    foreach ($data['answers'] as $ans) {
        $text .= "❓ <b>" . htmlspecialchars($ans['question']) . "</b>\n";
        $text .= "➡️ <i>" . htmlspecialchars($ans['answer']) . "</i>\n\n";
    }
}
$text .= "👤 <b>Имя:</b> " . (!empty($data['name']) ? htmlspecialchars($data['name']) : '-') . "\n";
$text .= "📞 <b>Телефон:</b> " . (!empty($data['phone']) ? htmlspecialchars($data['phone']) : '-') . "\n";
if (!empty($data['comment'])) {
    $text .= "💬 <b>Комментарий:</b> " . htmlspecialchars($data['comment']) . "\n";
}

foreach ($chatIds as $chatId) {
    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($text) . "&parse_mode=HTML";
    $result = @file_get_contents($url);
    if ($result === false) {
        log_quiz('Ошибка отправки в Telegram для chat_id ' . $chatId . ': ' . error_get_last()['message']);
    } else {
        log_quiz('Успешно отправлено в chat_id ' . $chatId . ': ' . $result);
    }
}

echo json_encode(['ok' => true]);
?> 