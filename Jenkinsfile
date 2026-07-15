pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Print Message') {
            steps {
                echo "🚀 New push detected on development branch!"
                echo "Build Number: HG45981"
            }
        }
    }

    post {
        success {
            githubNotify(
                status: 'SUCCESS',
                description: 'Build passed',
                context: 'Jenkins CI'
            )
        }
        failure {
            githubNotify(
                status: 'FAILURE',
                description: 'Build failed',
                context: 'Jenkins CI'
            )
        }
        always {
            cleanWs()
        }
    }
}