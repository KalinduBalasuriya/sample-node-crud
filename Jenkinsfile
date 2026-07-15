pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Check Credentials') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
                    sh 'echo "Token found: ${#TOKEN} characters long"'
                }
            }
        }

        stage('Print Message') {
            steps {
                echo "🚀 New push detected on development branch!"
                echo "Build Number: ${env.BUILD_NUMBER}"
                echo "Commit: ${env.GIT_COMMIT}"
            }
        }
    }

    post {
        success {
            githubNotify(
                credentialsId: 'github-token-up',
                account: 'KalinduBalasuriya',
                repo: 'sample-node-crud',
                sha: env.GIT_COMMIT,
                status: 'SUCCESS',
                description: 'Build passed',
                context: 'Jenkins CI'
            )
        }
        failure {
            githubNotify(
                credentialsId: 'github-token-up',
                account: 'KalinduBalasuriya',
                repo: 'sample-node-crud',
                sha: env.GIT_COMMIT,
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