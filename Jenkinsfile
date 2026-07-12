pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Print Message') {
            steps {
                echo "🚀 New push detected on development branch!"
                echo "Build Number: 123"
            }
        }
    }
}