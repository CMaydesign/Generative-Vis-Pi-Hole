# import schedule
# import time
import json
from urllib.request import urlopen
 
try:
        f = urlopen('http://192.168.1.70/admin/api.php')
        json_string = f.read()
        parsed_json = json.loads(json_string)
        queries = parsed_json['dns_queries_today']
        adsblocked = parsed_json['ads_blocked_today']
        clients = parsed_json['unique_clients']
        domainsblocked = parsed_json['domains_being_blocked']
        f.close()
except:
        queries = '-'
        adsblocked = '-'
        clients = '-'
    
pihole = 'Domains Blocked: ' + str(domainsblocked) + ' - ' 'DNS-Queries: ' + str(queries) + ' - ' + 'Ads blocked: ' + str(adsblocked) + ' - ' + 'Devices: ' + str(clients)
print (pihole)

f = open("pi-hole-data.txt", "w")
f.write(str(domainsblocked))
f.close()

    # schedule.every(10).seconds.do(job)

# while 1:
#     schedule.run_pending()
#     time.sleep(1)
