terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "us-east-1"
}
variable "instance_type" {
  type    = string
  default = "t3.micro"
}
variable "public_key_path" {
  type    = string
  default = "~/.ssh/id_rsa.pub"
}
variable "my_ip" {
  type        = string
  default     = "0.0.0.0/0"
  description = "Batasi SSH ke IP rumah, misalnya 122.161.49.187/32"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "atlas" {
  name        = "atlas-web-sg"
  description = "SSH + HTTP untuk Repo Atlas"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_key_pair" "atlas" {
  key_name   = "atlas-deploy-key"
  public_key = file(var.public_key_path)
}

resource "aws_instance" "atlas" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.atlas.key_name
  vpc_security_group_ids = [aws_security_group.atlas.id]

  tags = { Name = "repo-atlas" }
}

resource "aws_eip" "atlas" {
  instance = aws_instance.atlas.id
  domain   = "vpc"
}

output "public_ip" {
  value       = aws_eip.atlas.public_ip
  description = "IP publik statis untuk mengakses http://<public_ip>"
}

output "ssh" {
  value = "ssh -i ~/.ssh/id_rsa ubuntu@${aws_eip.atlas.public_ip}"
}
