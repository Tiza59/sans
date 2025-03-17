#ifndef WEBBRIDGE_H
#define WEBBRIDGE_H

#include <QObject>
#include <QString>
#include <QVariant>
#include <QJsonDocument>
#include <QJsonObject>

class WebBridge : public QObject
{
    Q_OBJECT

public:
    explicit WebBridge(QObject *parent = nullptr);

public slots:
    // Method to receive messages from JavaScript
    void sendMessage(const QString &messageJson);

    // Native functionality exposed to JavaScript
    QString openFileDialog(const QVariantMap &options);
    bool showNotification(const QVariantMap &options);

signals:
    // Signal to send messages to JavaScript
    void messageReceived(const QString &messageJson);

    // Signals for specific events
    void fileSelected(const QString &filePath);

private:
    // Helper methods
    void sendResponse(const QString &id, const QVariant &data, const QString &error = QString());
    void processMessage(const QJsonObject &message);
};

#endif // WEBBRIDGE_H
