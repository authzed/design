#!/bin/bash

# Function to process a file
update_file() {
    local file="$1"
    # Create a temporary file
    temp_file="${file}.tmp"
    
    # Update imports using sed with specific patterns
    sed -e "s/from ['\"].*lib\/utils['\"]*/from '@\/utils\/utils'/g" \
        -e "s/from ['\"].*utils\/utils['\"]*/from '@\/utils\/utils'/g" \
        -e "s/from ['\"].*components\/ui\//from '@\/shared\/ui\//g" \
        -e "s/from ['\"].*shared\/ui\//from '@\/shared\/ui\//g" \
        -e "s/from ['\"]\.\.\/.\.\/components\/ui\//from '@\/shared\/ui\//g" \
        -e "s/from ['\"]\.\.\/.\.\/lib\//from '@\/utils\//g" \
        -e "s/from ['\"]\.\.\/.\.\/types\//from '@\/core\/types\//g" \
        -e "s/from ['\"]\.\.\/.\.\/hooks\//from '@\/shared\/hooks\//g" \
        -e "s/from ['\"].*core\/types\//from '@\/core\/types\//g" \
        -e "s/from ['\"].*template-storage['\"]*/from '@\/utils\/template-storage'/g" \
        -e "s/from ['\"].*signature-generator['\"]*/from '@\/utils\/signature-generator'/g" \
        "$file" > "$temp_file"
    
    # Replace original file with temporary file
    mv "$temp_file" "$file"
}

# Process all TypeScript/React files in src/shared/ui
for file in src/shared/ui/*.tsx; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        update_file "$file"
    fi
done

# Process signature components
for file in src/features/signature/*.tsx; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        update_file "$file"
    fi
done

# Process hooks
for file in src/shared/hooks/*.ts; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        update_file "$file"
    fi
done

echo "Import paths updated successfully!"
