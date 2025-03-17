#include "mainwindow.h"
#include <QMenuBar>
#include <QMenu>
#include <QAction>
#include <QVBoxLayout>
#include <QFileDialog>
#include <QStandardPaths>
#include <QWebEngineProfile>
#include <QWebEngineScript>
#include <QWebEngineScriptCollection>
#include <QApplication>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , m_webView(nullptr)
    , m_webBridge(nullptr)
    , m_webChannel(nullptr)
{
    // Set up the web view
    setupWebView();
    
    // Set up the web channel for JavaScript communication
    setupWebChannel();
    
    // Set up menus
    setupMenus();
    
    // Set central widget
    QWidget *centralWidget = new QWidget(this);
    QVBoxLayout *layout = new QVBoxLayout(centralWidget);
    layout->setContentsMargins(0, 0, 0, 0);
    layout->addWidget(m_webView);
    centralWidget->setLayout(layout);
    setCentralWidget(centralWidget);
}

MainWindow::~MainWindow()
{
    // Clean up resources
    if (m_webBridge) {
        m_webBridge->deleteLater();
    }
    
    if (m_webChannel) {
        m_webChannel->deleteLater();
    }
}

void MainWindow::loadUrl(const QUrl &url)
{
    if (m_webView) {
        m_webView->load(url);
    }
}

void MainWindow::setupWebView()
{
    // Create the WebEngineView
    m_webView = new QWebEngineView(this);
    
    // Enable developer tools
    QWebEngineProfile::defaultProfile()->settings()->setAttribute(
        QWebEngineSettings::JavascriptEnabled, true);
    QWebEngineProfile::defaultProfile()->settings()->setAttribute(
        QWebEngineSettings::JavascriptCanOpenWindows, true);
    QWebEngineProfile::defaultProfile()->settings()->setAttribute(
        QWebEngineSettings::LocalStorageEnabled, true);
    QWebEngineProfile::defaultProfile()->settings()->setAttribute(
        QWebEngineSettings::DeveloperExtrasEnabled, true);
    
    // Connect signals
    connect(m_webView, &QWebEngineView::loadFinished, this, [this](bool success) {
        if (success) {
            qDebug() << "Page loaded successfully";
        } else {
            qDebug() << "Failed to load page";
        }
    });
}

void MainWindow::setupWebChannel()
{
    // Create web channel for communication between C++ and JavaScript
    m_webChannel = new QWebChannel(this);
    
    // Create bridge object
    m_webBridge = new WebBridge(this);
    
    // Register bridge object with the web channel
    m_webChannel->registerObject(QStringLiteral("bridge"), m_webBridge);
    
    // Set the web channel on the web view page
    m_webView->page()->setWebChannel(m_webChannel);
    
    // Inject the QWebChannel API into the page
    QFile webChannelJsFile(":/qtwebchannel/qwebchannel.js");
    if (webChannelJsFile.open(QIODevice::ReadOnly)) {
        QString webChannelJs = QString::fromUtf8(webChannelJsFile.readAll());
        webChannelJsFile.close();
        
        // Add the custom initialization code
        QString initCode = webChannelJs + "\
            new QWebChannel(qt.webChannelTransport, function(channel) {\
                window.bridge = channel.objects.bridge;\
                // Notify JavaScript that the bridge is ready\
                if (typeof window.bridgeReady === 'function') {\
                    window.bridgeReady(window.bridge);\
                }\
            });\
        ";
        
        QWebEngineScript script;
        script.setSourceCode(initCode);
        script.setName("qwebchannel.js");
        script.setWorldId(QWebEngineScript::MainWorld);
        script.setInjectionPoint(QWebEngineScript::DocumentCreation);
        script.setRunsOnSubFrames(false);
        
        m_webView->page()->scripts().insert(script);
    }
}

void MainWindow::setupMenus()
{
    // Create File menu
    QMenu *fileMenu = menuBar()->addMenu(tr("&File"));
    
    // Add Open action
    QAction *openAction = fileMenu->addAction(tr("&Open..."));
    openAction->setShortcut(QKeySequence::Open);
    connect(openAction, &QAction::triggered, this, [this]() {
        QString filePath = QFileDialog::getOpenFileName(
            this,
            tr("Open File"),
            QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation),
            tr("All Files (*)"));
            
        if (!filePath.isEmpty()) {
            // Emit signal to notify JavaScript
            m_webBridge->fileSelected(filePath);
        }
    });
    
    // Add Exit action
    QAction *exitAction = fileMenu->addAction(tr("E&xit"));
    exitAction->setShortcut(QKeySequence::Quit);
    connect(exitAction, &QAction::triggered, this, &QWidget::close);
    
    // Create View menu
    QMenu *viewMenu = menuBar()->addMenu(tr("&View"));
    
    // Add Reload action
    QAction *reloadAction = viewMenu->addAction(tr("&Reload"));
    reloadAction->setShortcut(QKeySequence::Refresh);
    connect(reloadAction, &QAction::triggered, m_webView, &QWebEngineView::reload);
    
    // Add Developer Tools action
    QAction *devToolsAction = viewMenu->addAction(tr("Developer &Tools"));
    devToolsAction->setShortcut(Qt::Key_F12);
    connect(devToolsAction, &QAction::triggered, this, [this]() {
        m_webView->page()->triggerAction(QWebEnginePage::InspectElement);
    });
    
    // Create Help menu
    QMenu *helpMenu = menuBar()->addMenu(tr("&Help"));
    
    // Add About action
    QAction *aboutAction = helpMenu->addAction(tr("&About"));
    connect(aboutAction, &QAction::triggered, this, [this]() {
        QMessageBox::about(this, tr("About Sans UI KDE Bridge"),
            tr("<h2>Sans UI KDE Bridge</h2>"
               "<p>Version 1.0.0</p>"
               "<p>A native KDE bridge for Sans UI applications.</p>"));
    });
    
    // Add About Qt action
    QAction *aboutQtAction = helpMenu->addAction(tr("About &Qt"));
    connect(aboutQtAction, &QAction::triggered, qApp, &QApplication::aboutQt);
}
