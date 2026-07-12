pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Print Message') {
            steps {
                  githubNotify(
                    status: 'PENDING',
                    description: 'Build is running...',
                    context: 'Jenkins CI'
                )
                echo "🚀 New push detected on development branch!"
                echo "Build Number: 123"
                  githubNotify(
                    status: 'Completed',
                    description: 'Build is Completed...',
                    context: 'Jenkins CI'
                )
            }
        }
    }
}