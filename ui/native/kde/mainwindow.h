#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QWebEngineView>
#include <QWebChannel>
#include <QUrl>
#include "webbridge.h"

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    void loadUrl(const QUrl &url);

private:
    QWebEngineView *m_webView;
    WebBridge *m_webBridge;
    QWebChannel *m_webChannel;

    void setupWebView();
    void setupWebChannel();
    void setupMenus();
};

#endif // MAINWINDOW_H
