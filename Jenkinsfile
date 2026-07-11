pipeline {

    agent any

    stages {


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