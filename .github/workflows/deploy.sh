#!/bin/bash

# Variables
BUILD_ARTIFACTS_DIR="build"  # Directory where build artifacts are located
EC2_INSTANCE_USERNAME="ec2-user"  # Username for SSH access to EC2 instance
EC2_INSTANCE_HOST="your-ec2-instance-ip"  # Public IP or hostname of your EC2 instance
EC2_INSTANCE_DEST_DIR="/path/to/destination"  # Destination directory on EC2 instance

# Transfer build artifacts to EC2 instance using SCP
scp -r "$BUILD_ARTIFACTS_DIR" "$EC2_INSTANCE_USERNAME@$EC2_INSTANCE_HOST:$EC2_INSTANCE_DEST_DIR"

# Additional steps (optional)
# You can include additional steps here, such as:
# - Restarting your application server
# - Managing environment variables
# - Executing database migrations
# Example:
# ssh "$EC2_INSTANCE_USERNAME@$EC2_INSTANCE_HOST" "cd $EC2_INSTANCE_DEST_DIR && ./restart_server.sh"
# ssh "$EC2_INSTANCE_USERNAME@$EC2_INSTANCE_HOST" "cd $EC2_INSTANCE_DEST_DIR && export ENV_VAR=value"
# ssh "$EC2_INSTANCE_USERNAME@$EC2_INSTANCE_HOST" "cd $EC2_INSTANCE_DEST_DIR && ./run_migrations.sh"
