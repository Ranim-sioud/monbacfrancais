import sys
from googlenewsdecoder import new_decoderv1

def main():
    if len(sys.argv) < 2:
        sys.exit(1)
        
    url = sys.argv[1]
    try:
        decoded = new_decoderv1(url, interval=1)
        if decoded.get("status"):
            print(decoded["decoded_url"])
        else:
            sys.exit(1)
    except Exception:
        sys.exit(1)

if __name__ == "__main__":
    main()
