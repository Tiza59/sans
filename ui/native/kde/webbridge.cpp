#include "webbridge.h"
#include <QFileDialog>
#include <QStandardPaths>
#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonValue>
#include <QDebug>
#include <QUrl>
#include <QDesktopServices>
#include <QApplication>
#include <KNotification>

WebBridge::WebBridge(QObject *parent)
    : QObject(parent)
{
}

void WebBridge::sendMessage(const QString &messageJson)
{
    QJsonDocument doc = QJsonDocument::fromJson(messageJson.toUtf8());
    if (!doc.isObject()) {
        qWarning() << "Received invalid JSON message from JavaScript";
        return;
    }
    
    processMessage(doc.object());
}

QString WebBridge::openFileDialog(const QVariantMap &options)
{
    // Extract options
    QString title = options.value("title", "Open File").toString();
    QString directory = options.value("directory", 
        QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation)).toString();
    QString filter = options.value("filter", "All Files (*)").toString();
    bool saveDialog = options.value("saveDialog", false).toBool();
    
    QString filePath;
    
    if (saveDialog) {
        filePath = QFileDialog::getSaveFileName(
            qobject_cast<QWidget*>(parent()),
            title,
            directory,
            filter);
    } else {
        filePath = QFileDialog::getOpenFileName(
            qobject_cast<QWidget*>(parent()),
            title,
            directory,
            filter);
    }
    
    return filePath;
}

bool WebBridge::showNotification(const QVariantMap &options)
{
    // Extract options
    QString title = options.value("title", "Notification").toString();
    QString text = options.value("text", "").toString();
    QString iconName = options.value("iconName", "dialog-information").toString();
    
    // Create KDE notification
    KNotification *notification = new KNotification("notification", KNotification::CloseOnTimeout, this);
    notification->setTitle(title);
    notification->setText(text);
    notification->setIconName(iconName);
    
    // Add actions if provided
    QVariantList actions = options.value("actions").toList();
    for (const QVariant &actionVar : actions) {
        QVariantMap actionMap = actionVar.toMap();
        QString actionId = actionMap.value("id").toString();
        QString actionText = actionMap.value("text").toString();
        
        if (!actionId.isEmpty() && !actionText.isEmpty()) {
            notification->addAction(actionText);
        }
    }
    
    // Connect action signals
    connect(notification, &KNotification::activated, this, [this, notification](int actionIndex) {
        // Send action back to JavaScript
        QJsonObject response;
        response["type"] = "notificationAction";
        response["actionIndex"] = actionIndex;
        
        QJsonDocument doc(response);
        emit messageReceived(doc.toJson(QJsonDocument::Compact));
    });
    
    // Show the notification
    notification->sendEvent();
    
    return true;
}

void WebBridge::sendResponse(const QString &id, const QVariant &data, const QString &error)
{
    QJsonObject response;
    response["id"] = id;
    
    if (error.isEmpty()) {
        // Success response
        if (data.type() == QVariant::Map) {
            response["data"] = QJsonObject::fromVariantMap(data.toMap());
        } else {
            response["data"] = QJsonValue::fromVariant(data);
        }
    } else {
        // Error response
        response["error"] = error;
    }
    
    QJsonDocument doc(response);
    emit messageReceived(doc.toJson(QJsonDocument::Compact));
}

void WebBridge::processMessage(const QJsonObject &message)
{
    QString id = message["id"].toString();
    QString action = message["action"].toString();
    QJsonObject dataObj = message["data"].toObject();
    QVariantMap data = dataObj.toVariantMap();
    
    if (action == "navigate") {
        // Handle navigation request
        QString url = data["url"].toString();
        if (!url.isEmpty()) {
            // This would be handled by the main window
            // For now, just send a success response
            sendResponse(id, true);
            
            // Emit a signal that the main window can connect to
            // to handle the actual navigation
            // This would be implemented in a real application
        } else {
            sendResponse(id, QVariant(), "Invalid URL");
        }
    } else if (action == "reload") {
        // Handle reload request
        // This would be handled by the main window
        // For now, just send a success response
        sendResponse(id, true);
    } else if (action == "executeJavaScript") {
        // Handle JavaScript execution request
        QString code = data["code"].toString();
        if (!code.isEmpty()) {
            // This would be handled by the main window
            // For now, just send a success response
            sendResponse(id, true);
        } else {
            sendResponse(id, QVariant(), "Invalid JavaScript code");
        }
    } else if (action == "openFileDialog") {
        // Handle file dialog request
        QString filePath = openFileDialog(data);
        sendResponse(id, filePath);
    } else if (action == "showNotification") {
        // Handle notification request
        bool success = showNotification(data);
        sendResponse(id, success);
    } else {
        // Unknown action
        sendResponse(id, QVariant(), QString("Unknown action: %1").arg(action));
    }
}
