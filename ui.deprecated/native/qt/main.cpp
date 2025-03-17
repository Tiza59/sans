#include <QApplication>
#include <QCommandLineParser>
#include <QUrl>
#include "mainwindow.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    app.setApplicationName("Sans UI Qt WebEngine");
    app.setApplicationVersion("1.0.0");

    QCommandLineParser parser;
    parser.setApplicationDescription("Sans UI Qt WebEngine Bridge");
    parser.addHelpOption();
    parser.addVersionOption();

    // Add URL option
    QCommandLineOption urlOption(QStringList() << "u" << "url", "URL to load", "url", "http://localhost:3000");
    parser.addOption(urlOption);

    // Add title option
    QCommandLineOption titleOption(QStringList() << "t" << "title", "Window title", "title", "Sans UI Application");
    parser.addOption(titleOption);

    // Add window size options
    QCommandLineOption widthOption(QStringList() << "w" << "width", "Window width", "width", "800");
    QCommandLineOption heightOption(QStringList() << "h" << "height", "Window height", "height", "600");
    parser.addOption(widthOption);
    parser.addOption(heightOption);

    // Process the command line arguments
    parser.process(app);

    // Get values from command line
    QString url = parser.value(urlOption);
    QString title = parser.value(titleOption);
    int width = parser.value(widthOption).toInt();
    int height = parser.value(heightOption).toInt();

    // Create and show the main window
    MainWindow mainWindow;
    mainWindow.setWindowTitle(title);
    mainWindow.resize(width, height);
    mainWindow.loadUrl(QUrl(url));
    mainWindow.show();

    return app.exec();
}
