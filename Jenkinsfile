pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Print Message') {
            steps {
                echo "🚀 New push detected on development branch!"
                echo "Build Number: }"
            }
        }
    }

    post {
        success {
            githubNotify(
                credentialsId: 'github-token',
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
                credentialsId: 'github-token',
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