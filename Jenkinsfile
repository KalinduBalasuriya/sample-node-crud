pipeline {

    agent any

    stages {

        /*
         * Runs for every branch
         */
        stage('Checkout') {
            steps {
                echo "Checking out branch: ${env.BRANCH_NAME}"
            }
        }


        /*
         * Development branch pipeline
         */
        stage('Development Pipeline') {

            when {
                branch 'development'
            }

            steps {

                echo "Running development pipeline"

                echo "Development branch build successful"

                // Later you can add:
                // sh 'npm ci'
                // sh 'npm test'
            }
        }


        /*
         * Main branch pipeline
         */
        stage('Production Pipeline') {

            when {
                branch 'main'
            }

            steps {

                echo "Running production pipeline"

                echo "Starting production deployment"


                sshagent(['node-crud-server-key']) {

                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@ec2-18-207-120-245.compute-1.amazonaws.com
                    
                    cd /home/ec2-user/sample-node-crud &&
                    
                    git pull origin main &&
                    
                    npm ci &&
                    
                    pm2 restart sample-node-crud
                    
                    '''
                }
            }
        }
    }


    post {

        success {

            echo "Pipeline completed successfully"

            /*
             GitHub status notification happens here
             if GitHub plugin is configured
            */

        }


        failure {

            echo "Pipeline failed"

            /*
             GitHub will receive failed status
             if GitHub integration is configured
            */

        }
    }
}


// pipeline {
//     agent any

//     triggers {
//         githubPush()
//     }

//     stages {
//         stage('Check Credentials') {
//             steps {
//                 withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
//                     sh 'echo "Token found: ${#TOKEN} characters long"'
//                 }
//             }
//         }

//         stage('Print Message') {
//             steps {
//                 echo "🚀 New push detected on development branch!"
//                 echo "Build Number: ${env.BUILD_NUMBER}"
//                 echo "Commit: ${env.GIT_COMMIT}"
//             }
//         }
//     }

//     post {
//         success {
//             githubNotify(
//                 credentialsId: 'github-token-up',
//                 account: 'KalinduBalasuriya',
//                 repo: 'sample-node-crud',
//                 sha: env.GIT_COMMIT,
//                 status: 'SUCCESS',
//                 description: 'Jenkins Build passed',
//                 context: 'Jenkins CI'
//             )
//         }
//         failure {
//             githubNotify(
//                 credentialsId: 'github-token-up',
//                 account: 'KalinduBalasuriya',
//                 repo: 'sample-node-crud',
//                 sha: env.GIT_COMMIT,
//                 status: 'FAILURE',
//                 description: 'Build failed',
//                 context: 'Jenkins CI'
//             )
//         }
//         always {
//             cleanWs()
//         }
//     }
// }
