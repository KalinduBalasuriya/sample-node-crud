pipeline {

    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/yourname/node-crud-app.git'
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