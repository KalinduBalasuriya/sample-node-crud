pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'git https://github.com/KalinduBalasuriya/sample-node-crud.git'
            }
        }


        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }


        stage('Run Tests') {
            steps {
                echo 'testing...'
            }
        }


        stage('Build') {
            steps {
                echo 'Application build completed'
            }
        }
    }
}